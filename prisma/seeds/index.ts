import { Board, PrismaClient, TodoPriority, TodoSize } from '@prisma/client';
import bcrypt from 'bcryptjs';

export const seeding = async (prisma: PrismaClient) => {
  console.log('Seeding start...');

  const hashedPassword = await bcrypt.hash('sigma', 10);

  const user = await prisma.user.create({
    data: {
      email: 'peter@sigma.com',
      firstName: 'Peter',
      lastName: 'Parker',
      password: hashedPassword,
    },
  });

  const columnTodo = await prisma.todoColumn.create({
    data: {
      title: 'Todo',
      orderIndex: 0,
      board: Board.PERSONAL,
      createdAt: new Date(),
      updatedAt: new Date(),
      todoItems: {
        createMany: {
          data: [
            {
              title: 'Buy groceries',
              size: TodoSize.SNACK,
              priority: TodoPriority.LOW,
              userId: user.id,
            },
            {
              title: 'Walk the dog',
              size: TodoSize.MEDIUM,
              priority: TodoPriority.MEDIUM,
              dueDate: new Date('2023-04-30T12:00:00.000Z'),
              userId: user.id,
            },
          ],
        },
      },
      user: {
        connect: {
          id: user.id,
        },
      },
    },
    include: {
      todoItems: true,
    },
  });

  // create subtasks in the first todo of columnTodo
  const subtasks = await prisma.todoSubtask.createMany({
    data: [
      {
        title: 'Buy milk',
        todoItemId: columnTodo.todoItems[0].id,
      },
      {
        title: 'Buy bread',
        todoItemId: columnTodo.todoItems[0].id,
      },
    ],
  });

  const columnInProgress = await prisma.todoColumn.create({
    data: {
      title: 'In Progress',
      board: Board.PERSONAL,
      createdAt: new Date(),
      updatedAt: new Date(),
      orderIndex: 1,
      todoItems: {
        createMany: {
          data: [
            {
              title: 'Complete report',
              size: TodoSize.LARGE,
              priority: TodoPriority.HIGH,
              dueDate: new Date('2023-04-28T09:00:00.000Z'),
              userId: user.id,
            },
          ],
        },
      },
      userId: user.id,
    },
  });

  const columnDone = await prisma.todoColumn.create({
    data: {
      title: 'Completed',
      board: Board.PERSONAL,
      createdAt: new Date(),
      updatedAt: new Date(),
      orderIndex: 2,
      todoItems: {
        createMany: {
          data: [
            {
              title: 'Schedule meeting',
              size: TodoSize.MEDIUM,
              priority: TodoPriority.MEDIUM,
              dueDate: new Date('2023-05-01T14:00:00.000Z'),
              isCompleted: true,
              userId: user.id,
            },
          ],
        },
      },
      userId: user.id,
    },
  });

  console.log(`User created: ${JSON.stringify(user, null, 2)}`);
};
