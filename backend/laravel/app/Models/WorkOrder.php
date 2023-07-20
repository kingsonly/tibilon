<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkOrder extends Model
{
    use HasFactory;
    const Pending = 0;
    public function assignees()
    {
        return $this->hasMany(WorkOrderAssignee::class, "work_order_id");
    }
}
