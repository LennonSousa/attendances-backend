import Schedule from '../models/EmployeeShiftSchedulesModel';
import dayView from './employeeShiftDayView';

export default {
    render(schedule: Schedule) {
        return {
            id: schedule.id,
            from: schedule.from,
            to: schedule.to,
            day: schedule.day && dayView.render(schedule.day),
        }
    },

    renderMany(schedules: Schedule[]) {
        const softedSchedules = schedules.sort((a, b) => a.to - b.to);

        return softedSchedules.map(schedule => this.render(schedule));
    }
}