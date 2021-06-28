import Employee from '../models/EmployeesModel';
import shiftView from './employeeShiftView';
import scheduleView from './employeeShiftScheduleView';
import attendanceView from './employeeAttendanceView';

export default {
    render(employee: Employee) {
        return {
            id: employee.id,
            name: employee.name,
            pin: employee.pin,
            created_by: employee.created_by,
            created_at: employee.created_at,
            shift: employee.shift && shiftView.render(employee.shift),
            attendances: employee.attendances ? attendanceView.renderMany(employee.attendances) : [],
        }
    },

    renderMany(employees: Employee[]) {
        return employees.map(employee => this.render(employee));
    }
}