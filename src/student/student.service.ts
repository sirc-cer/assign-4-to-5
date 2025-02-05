import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private studentRepository: Repository<Student>,
    ) { }

    // CREATE
    async createStudent(student: Partial<Student>): Promise<Student> {
        const newStudent = this.studentRepository.create(student);
        return await this.studentRepository.save(newStudent);
    }

    // READ (GET ALL)
    async getAllStudents(): Promise<Student[]> {
        return await this.studentRepository.find();
    }

    // READ (GET ONE)
    async getStudentById(id: number): Promise<Student> {
        const student = await this.studentRepository.findOne({ where: { id } });
        if (!student) {
            throw new NotFoundException('Student not found');
        }
        return student;
    }

    // UPDATE (PUT)
    async updateStudent(id: number, updatedData: Partial<Student>): Promise<Student> {
        const student = await this.getStudentById(id);
        Object.assign(student, updatedData);
        return this.studentRepository.save(student);
    }

    // PARTIAL UPDATE (PATCH)
    async partialUpdateStudent(id: number, partialData: Partial<Student>): Promise<Student> {
        const student = await this.getStudentById(id);
        Object.assign(student, partialData);
        return this.studentRepository.save(student);
    }

    // DELETE
    async deleteStudent(id: number): Promise<{ message: string }> {
        const result = await this.studentRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Student not found');
        }
        return { message: `The student with ID ${id} has been successfully removed.` };
    }
}