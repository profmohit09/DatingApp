using System;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class UserRepository(DataContext context) : IUserRepository
{
    public async Task<AppUser> GetUserByIdAsync(string id)
    {
        return await context.Users.FindAsync(id);
    }

    public async Task<AppUser> GetUserByNameAsync(string userename)
    {
        return await context.Users.SingleOrDefaultAsync(x => x.UserName == userename);
    }

    public async Task<IEnumerable<AppUser>> GetUsersAsync()
    {
        return await context.Users.ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public void Update(AppUser user)
    {
        context.Entry(user).State = EntityState.Modified;
    }
}
