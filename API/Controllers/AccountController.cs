﻿using System.Reflection.Metadata.Ecma335;
using System.Security.Cryptography;
using System.Text;
using API.Controllers;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController : BaseApiController 
{
    private readonly DataContext _context;
    private readonly ITokenService _tokenService;

    public AccountController(DataContext context, ITokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    [HttpPost("register")] //api/account/register
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if(await UserExists(registerDto.Username)) return BadRequest("Username is taken");

        //need to undo
        return Ok("Username is available");
        
        // using var hmac = new HMACSHA512();
 

        // var user = new AppUser
        // {
        //     UserName = registerDto.Username.ToLower(),
        //     PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
        //     PasswordSalt = hmac.Key
        // };

        // _context.Users.Add(user);
        // await _context.SaveChangesAsync();

        // return new UserDto
        // {
        //     Username = user.UserName,
        //     Token  = _tokenService.CreateToken(user)
        // };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        //User Criteria
        var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == loginDto.Username);
        
        if (user == null) return Unauthorized("Invalid Username");

        //Password Criteria
        using var hmac = new HMACSHA512(user.PasswordSalt);
        
        var ComputeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password)); 
        for(int i = 0; i < ComputeHash.Length; i++)
        {
            if(ComputeHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
        } 

        
        var userDto = new UserDto
        {
            Username = user.UserName,
            Token  = _tokenService.CreateToken(user)
        };

        return userDto;
    }
    private async Task<bool> UserExists(string username)
    {
        return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
    }
}
