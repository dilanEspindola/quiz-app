import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { CreateAnswerDto } from "./dtos";

@Injectable()
export class AnswerPipe implements PipeTransform {
  transform(value: CreateAnswerDto, metadata: ArgumentMetadata) {
    if (typeof value.questionId === "string") {
      const idNumber = Number(value.questionId);

      return { ...value, questionId: idNumber };
    }
    return value;
  }
}
