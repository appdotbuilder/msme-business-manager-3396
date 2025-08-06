<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create permissions
        $permissions = [
            ['name' => 'manage_customers', 'display_name' => 'Manage Customers'],
            ['name' => 'view_customers', 'display_name' => 'View Customers'],
            ['name' => 'manage_products', 'display_name' => 'Manage Products'],
            ['name' => 'view_products', 'display_name' => 'View Products'],
            ['name' => 'manage_sales', 'display_name' => 'Manage Sales'],
            ['name' => 'view_sales', 'display_name' => 'View Sales'],
            ['name' => 'manage_inventory', 'display_name' => 'Manage Inventory'],
            ['name' => 'view_inventory', 'display_name' => 'View Inventory'],
            ['name' => 'manage_accounting', 'display_name' => 'Manage Accounting'],
            ['name' => 'view_accounting', 'display_name' => 'View Accounting'],
            ['name' => 'view_dashboard', 'display_name' => 'View Dashboard'],
            ['name' => 'manage_users', 'display_name' => 'Manage Users'],
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission['name']], $permission);
        }

        // Create roles
        $ownerRole = Role::firstOrCreate(
            ['name' => 'owner'],
            ['display_name' => 'Business Owner', 'description' => 'Full access to all features']
        );

        $managerRole = Role::firstOrCreate(
            ['name' => 'manager'],
            ['display_name' => 'Manager', 'description' => 'Access to most features except user management']
        );

        $employeeRole = Role::firstOrCreate(
            ['name' => 'employee'],
            ['display_name' => 'Employee', 'description' => 'Limited access to daily operations']
        );

        // Assign permissions to roles
        $allPermissions = Permission::all();
        $ownerRole->permissions()->sync($allPermissions->pluck('id'));

        $managerPermissions = Permission::whereNotIn('name', ['manage_users'])->get();
        $managerRole->permissions()->sync($managerPermissions->pluck('id'));

        $employeePermissions = Permission::whereIn('name', [
            'view_customers', 'manage_sales', 'view_sales', 'view_products', 
            'view_inventory', 'view_dashboard'
        ])->get();
        $employeeRole->permissions()->sync($employeePermissions->pluck('id'));
    }
}