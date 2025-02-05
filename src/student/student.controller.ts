import { Controller, Get, Post, Put, Body, Param, Patch, Delete } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.entity';

@Controller('students')
export class StudentController {
    constructor(private readonly studentService: StudentService) { }

    @Post()
    create(@Body() student: Partial<Student>): Promise<Student> {
        return this.studentService.createStudent(student);
    }

    @Get()
    findAll(): Promise<Student[]> {
        return this.studentService.getAllStudents();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Student> {
        return this.studentService.getStudentById(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() student: Partial<Student>) {
        return this.studentService.updateStudent(id, student);
    }

    @Patch(':id')
    partialupdate(@Param('id') id: number, @Body() student: Partial<Student>): Promise<Student> {
        return this.studentService.updateStudent(id, student);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.studentService.deleteStudent(id);
    }
}