using Application.DTOs;
using Application.Interfaces;
using AutoMapper;
using Core.Utils;
using Domain.Entities;
using Domain.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Application.Services
{
    public class AuthManager : IAuthManager
    {
        private readonly IMapper _mapper;
        private readonly IRepositoryAsync<UserEntity> _userRepository;
        private readonly IConfiguration _configuration;

        public AuthManager(IMapper mapper, IRepositoryAsync<UserEntity> userRepository, IConfiguration configuration)
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _configuration = configuration;
        }

        public async Task<ResultOperation<LoginResponseDTO>> VerifyUser(LoginDTO loginDto)
        {
            var result = new ResultOperation<LoginResponseDTO>();
            var users = await _userRepository.GetAll();

            if (users == null) {
                result.Message = "User not found";
                return result;
            }

            var user = users.Find(u => u.Username == loginDto.Username);

            if (user == null)
            {
                result.Message = "User incorrect";
                return result;
            }

            var correctPassword = VerifyPassword(loginDto.Password, user.PasswordHash);

            if (!correctPassword)
            {
                result.Message = "Username or password incorrect";
                return result;
            }

            var token = GenerateJwtToken(user);
            
            if (token == null)
            {
                result.Message = "An error occurred while generating the token";
                return result;
            }

            var loginResponse = _mapper.Map<LoginResponseDTO>(user);           
            loginResponse.Token = token;
            result.IsSuccess = true;
            result.Data = loginResponse;

            return result;
        }

        private string GenerateJwtToken(UserEntity user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtSettings = Environment.GetEnvironmentVariable("JWT_KEY") ?? _configuration["Jwt:Key"];

            if (jwtSettings == null)
            {
                throw new InvalidOperationException("JWT key is not defined.");
            }

            var key = Encoding.UTF8.GetBytes(jwtSettings);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Email, user.Email)
                 }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public bool VerifyPassword(string password, string hashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
        }
    }
}
