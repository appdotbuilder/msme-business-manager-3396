<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create seeders first
        $this->call([
            RolePermissionSeeder::class,
            ProductCategorySeeder::class,
            AccountCategorySeeder::class,
        ]);

        // Create demo user with owner role
        $user = User::factory()->create([
            'name' => 'Demo Business Owner',
            'email' => 'demo@msme-manager.com',
        ]);

        $ownerRole = Role::where('name', 'owner')->first();
        if ($ownerRole) {
            $user->roles()->attach($ownerRole);
        }

        // Create additional demo users
        $manager = User::factory()->create([
            'name' => 'Demo Manager',
            'email' => 'manager@msme-manager.com',
        ]);

        $managerRole = Role::where('name', 'manager')->first();
        if ($managerRole) {
            $manager->roles()->attach($managerRole);
        }

        $employee = User::factory()->create([
            'name' => 'Demo Employee',
            'email' => 'employee@msme-manager.com',
        ]);

        $employeeRole = Role::where('name', 'employee')->first();
        if ($employeeRole) {
            $employee->roles()->attach($employeeRole);
        }
    }
}
