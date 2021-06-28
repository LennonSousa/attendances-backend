import Shift from '../models/EmployeeShiftsModel';
import dayView from './employeeShiftDayView';
import employeeView from './employeeView';

export default {
    render(shift: Shift) {
        return {
            id: shift.id,
            name: shift.name,
            tolerance: shift.tolerance,
            days: shift.days ? dayView.renderMany(shift.days) : [],
            employees: shift.employees ? employeeView.renderMany(shift.employees) : [],
        }
    },

    renderMany(shifts: Shift[]) {
        return shifts.map(shift => this.render(shift));
    }
}