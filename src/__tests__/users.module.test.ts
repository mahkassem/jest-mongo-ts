import {
  User,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../models/users.models';
import { client } from '../utils/database/mongo.conn';

// Test user data
const data: User = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@test.com',
  password: 'password123',
};

describe('Users', () => {
  it('should create a new user', async () => {
    // Create a new user
    await createUser(data);

    // Get the user
    const user = await getUserById(1);

    // Should have the same data
    // Exclude _id from the comparison
    expect(user).toHaveProperty('id', 1);
    expect(user).toHaveProperty('name', 'John Doe');
    expect(user).toHaveProperty('email', 'john.doe@test.com');
    expect(user).toHaveProperty('password', 'password123');
  });

  it('should get all users', async () => {
    // Get all users
    const users = await getUsers();

    // Should be greater than 0
    // because we just created a user
    expect(users.length).toBeGreaterThan(0);
  });

  it('should get user by id', async () => {
    // Get user by id
    const user = await getUserById(1);

    // Should have the same data
    expect(user).toHaveProperty('id', 1);
    expect(user).toHaveProperty('name', 'John Doe');
    expect(user).toHaveProperty('email', 'john.doe@test.com');
    expect(user).toHaveProperty('password', 'password123');
  });

  it('should update user by id', async () => {
    // New data
    const data = {
      id: 1,
      name: 'Mary Doe',
      email: 'mary.doe@test.com',
      password: 'password123',
    };

    // Update user
    await updateUser(data);

    // Get user by id
    const user = await getUserById(1);

    // Should have the new data
    // Exclude _id from the comparison
    expect(user).toHaveProperty('id', 1);
    expect(user).toHaveProperty('name', 'Mary Doe');
    expect(user).toHaveProperty('email', 'mary.doe@test.com');
    expect(user).toHaveProperty('password', 'password123');
  });

  it('should delete user by id', async () => {
    // Delete user
    await deleteUser(1);

    // Get user by id
    const user = await getUserById(1);

    // Should be null
    expect(user).toBeNull();
  });

  afterAll(async () => {
    // Close the connection
    await client.close();
  });
});
