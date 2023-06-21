interface CreateUserDTO {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
}

interface UserDTO {
  uuid: string;
  slug: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  hashedPassword: string;
  createdAt: Date;
  updatedAt: Date | undefined;
  deletedAt: Date | undefined;
}

export { CreateUserDTO, UserDTO };
