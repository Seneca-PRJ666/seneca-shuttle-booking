'use strict'

import getLogger from '../config/config.logger.mjs'
import Campus from '../models/model.campus.mjs'
import {ItemNotFound} from "../services/services.errors.js";

export default class CampusDb {
    static logger = getLogger("CampusDao");

    static async deleteAll() {
        await Campus.deleteMany();
    }

    static async insertOne(campusData) {
        const campus = new Campus(campusData);
        try {
            await campus.save();
            return campus;
        } catch (e) {
            //todo handle error
            throw e;
        }
    }

    static async updateOne(campusName, data) {
        try {
            let campus = await Campus.findOne({name: campusName});
            if (!campus) {
                throw new ItemNotFound("Campus not found");
            }

            campus.destination = data;
            await campus.save();
            return campus;
        } catch (e) {
            this.logger.error(e.message);
            this.logger.error(e);
            //todo
        }
    }

    static async getRoutes(from, to) {
        try {
            const routes = await Campus.aggregate([
                //pick the document which match the from value
                {$match: {"name": from}},
                // Do a graph search
                {
                    $graphLookup: {
                        from: "campus",
                        startWith: "$destination.campus_name",
                        connectFromField: "destination.campus_name",
                        connectToField: "name",
                        as: "alternativeroutes",
                        restrictSearchWithMatch: {"destination.campus_name": {"$eq": to}, "name": {"$ne": from}}
                    }
                }
                , {
                    $project: {
                        name: 1,
                        // destination:1,
                        // Only pick the destination that matches the "to" field value or
                        // that provides alternative route
                        destination: {
                            $filter: {
                                input: "$destination",
                                as: "dirDest",
                                // The condition checks whether the "campus_name" matches the "to" field
                                // or the "campus_name" exists in the alternative routes. If not the filter
                                // discards that destination.
                                cond: {
                                    $or: [{
                                        $in: ["$$dirDest.campus_name", {
                                            $map: {
                                                input: "$alternativeroutes",
                                                as: "routeTomatch",
                                                in: "$$routeTomatch.name"
                                            }
                                        }]
                                    },
                                        {
                                            $eq: ["$$dirDest.campus_name", to]
                                        }]

                                }
                            }
                        },
                        // Alternative routes provide alternative ways to go from one campus to another
                        // instead of using direct route.
                        alternativeroutes: {
                            $map: {
                                input: "$alternativeroutes",
                                as: "route",
                                in: {
                                    from: "$$route.name",
                                    destination: {
                                        // Only take those destination for which the "campus_name" matches to the "to" field value
                                        $filter: {
                                            input: "$$route.destination",
                                            as: "destination",
                                            cond: {
                                                $eq: ["$$destination.campus_name", to]
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            ]);
            return routes;
        } catch (e) {
            console.error(e);
        }

    }
}



