import Day from '../models/EmployeeShiftDaysModel';
import shiftView from './employeeShiftView';
import scheduleView from './employeeShiftScheduleView';

export default {
    render(day: Day) {
        return {
            id: day.id,
            week_day: day.week_day,
            shift: day.shift && shiftView.render(day.shift),
            schedules: day.schedules ? scheduleView.renderMany(day.schedules) : [],
        }
    },

    renderMany(days: Day[]) {
        const softedDays = days.sort((a, b) => a.week_day - b.week_day);

        return softedDays.map(day => this.render(day));
    }
}