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
  is_complete: boolean
}

export interface TaskResult{
  is_complete: boolean,
  eval_result: string
  echo_text: string
}

export interface User{
  id: number,
  first_name: string,
  last_name: string,
  middle_name: string,
  email: string
}
