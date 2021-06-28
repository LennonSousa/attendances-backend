import Attendance from '../models/EmployeeAttendancesModel';
import employeeView from './employeeView';

export default {
    render(attendance: Attendance) {
        return {
            id: attendance.id,
            created_at: attendance.created_at,
            shift: attendance.employee && employeeView.render(attendance.employee),
        }
    },

    renderMany(attendances: Attendance[]) {
        return attendances.map(attendance => this.render(attendance));
    }
}