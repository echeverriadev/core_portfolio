import { Model, Document } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

export abstract class AbstractCrudService<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  async create(createDto: any): Promise<T> {
    createDto.updatedAt = new Date();
    const createdDocument = new this.model(createDto);
    return createdDocument.save();
  }

  async findAll(): Promise<T[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<T> {
    const document = await this.model.findById(id).exec();
    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return document;
  }

  async update(id: string, updateDto: any): Promise<T> {
    updateDto.updatedAt = new Date();
    const updatedDocument = await this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    if (!updatedDocument) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return updatedDocument;
  }

  async delete(id: string): Promise<T> {
    const deletedDocument = await this.model.findByIdAndDelete(id).exec();
    if (!deletedDocument) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return deletedDocument;
  }
}