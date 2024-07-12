import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('api/booking/dashboard')
export class DashboardController {
    constructor(private readonly adminDashboardService: DashboardService) { }

    @Get('consolidated-data')
    async getKeyMetrics() {
        return this.adminDashboardService.getKeyMetrics();
    }

    @Get('graphs')
    async getGraphsData() {
        return this.adminDashboardService.getGraphsData();
    }

    @Get('recent-activities')
    async getRecentActivities() {
        return this.adminDashboardService.getRecentActivities();
    }
    @Get('host-reservations')
    async getHostReservations() {
        return this.adminDashboardService.getAllHostsReservationsAndEarnings();
    }
}