import cron from "node-cron";
import config from "../config/index.js"
import { massiveDeleteUserSrv } from "../services/users.service.js";
const { elimination_criteria } = config

export const cleanUpUserJob = () => {
    cron.schedule(`${elimination_criteria.cron.minutes} ${elimination_criteria.cron.hours} ${elimination_criteria.cron.day} ${elimination_criteria.cron.month} ${elimination_criteria.cron.day_x}`, 
        async () => {
        await massiveDeleteUserSrv(elimination_criteria.batch_size, elimination_criteria.days_elapsed)
    });
}