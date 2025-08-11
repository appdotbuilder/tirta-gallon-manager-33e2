<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $employee = $this->route('employee');
        
        return [
            'barcode_tag' => 'required|string|max:255|unique:employees,barcode_tag,' . $employee->id,
            'employee_id' => 'required|string|max:255|unique:employees,employee_id,' . $employee->id,
            'name' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'grade' => 'required|in:G7,G8,G9,G10,G11,G12,G13',
            'location' => 'required|string|max:255',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'barcode_tag.required' => 'Barcode tag is required.',
            'barcode_tag.unique' => 'This barcode tag is already assigned to another employee.',
            'employee_id.required' => 'Employee ID is required.',
            'employee_id.unique' => 'This employee ID is already registered to another employee.',
            'name.required' => 'Employee name is required.',
            'department.required' => 'Department is required.',
            'grade.required' => 'Grade is required.',
            'grade.in' => 'Grade must be one of: G7, G8, G9, G10, G11, G12, G13.',
            'location.required' => 'Location is required.',
        ];
    }
}