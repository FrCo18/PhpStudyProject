export interface CourseItem {
  id_course: number,
  course: string,
  difficulty: string,
  description: string
}

export interface TaskItem {
  id_task: number,
  task_name: string,
  php_code: string,
  level_number: number,
  id_course: number,
  theory: string,
  course_name: string,
  difficulty: string,
  description: string
}
