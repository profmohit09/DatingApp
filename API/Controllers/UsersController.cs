using System.Diagnostics;
using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers; 

[Authorize]
[DebuggerDisplay($"{{{nameof(GetDebuggerDisplay)}(),nq}}")]
public class UsersController(IUserRepository userRepository) : BaseApiController
{
   private readonly IUserRepository _userRepository = userRepository;

    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
    {
        var users = await _userRepository.GetUsersAsync();

        return Ok(users);
    }
 
    [HttpGet("{username}")]
    public async Task<ActionResult<AppUser>> GetUser(string username)
    {
        var user = await _userRepository.GetUserByIdAsync(username);
        if (user == null) return NotFound();
        return user;
    }

    private string GetDebuggerDisplay()
    {
        return ToString()!;
    }
}
