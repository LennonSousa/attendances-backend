import Attendance from '../models/EmployeeAttendancesModel';
import employeeView from './employeeView';

export default {
    render(attendance: Attendance) {
        return {
            id: attendance.id,
            in: attendance.in,
            in_at: attendance.in_at,
            out: attendance.out,
            out_at: attendance.out_at,
            shift: attendance.employee && employeeView.render(attendance.employee),
        }
    },

    renderMany(attendances: Attendance[]) {
        const attendancesSorted = attendances.sort((a, b) => b.in_at.getTime() + a.in_at.getTime());

        return attendancesSorted.map(attendance => this.render(attendance));
    }
}