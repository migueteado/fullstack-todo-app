import { User, ToDoList, ToDoItem } from "@prisma/client";

export interface RequiresAuth {
  token?: string;
}

export interface UserObject extends Omit<User, "password"> {}
export interface UserResponse {
  status: string;
  data: {
    user: UserObject;
  };
}

export interface UserRegisterResponse {
  status: string;
  data: {
    user: UserObject;
  };
}

export interface UserLoginResponse {
  status: string;
  token: string;
}

export interface UserLogoutResponse {
  status: string;
}

export interface UserDeleteResponse {
  status: string;
  data: {
    deleteUser: UserObject;
  };
}

export interface ToDoListObject extends ToDoList {
  items: ToDoItemObject[];
}

export interface ToDoListResponse {
  status: string;
  data: {
    toDoList: ToDoListObject;
  };
}

export interface ToDoListManyResponse {
  status: string;
  data: {
    toDoLists: ToDoListObject[];
  };
}

export interface ToDoListCreateResponse {
  status: string;
  data: {
    toDoList: ToDoListObject;
  };
}

export interface ToDoListUpdateResponse {
  status: string;
  data: {
    toDoList: ToDoListObject;
  };
}

export interface ToDoListDeleteResponse {
  status: string;
  data: {
    deleteToDoList: ToDoListObject;
  };
}

export interface ToDoItemObject extends ToDoItem {}

export interface ToDoItemCreateResponse {
  status: string;
  data: {
    toDoItem: ToDoItemObject;
  };
}

export interface ToDoItemUpdateResponse {
  status: string;
  data: {
    toDoItem: ToDoItemObject;
  };
}

export interface ToDoItemDeleteResponse {
  status: string;
  data: {
    deleteToDoItem: ToDoItemObject;
  };
}
