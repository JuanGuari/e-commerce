using Application.DTOs;
using Application.Interfaces;
using AutoMapper;
using Core.Utils;
using Domain.Entities;
using Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class UserManager : IUserManager
    {
        private readonly IMapper _mapper;
        private readonly IRepositoryAsync<UserEntity> _userRepository;

        public UserManager(IMapper mapper, IRepositoryAsync<UserEntity> userRepository)
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }   

        public async Task<ResultOperation<UserDTO>> CreateAsync(UserCreateDTO newUser)
        {
            var result = new ResultOperation<UserDTO>();
            try
            {
                var user = _mapper.Map<UserEntity>(newUser);
                await _userRepository.Insert(user);
                result.IsSuccess = true;
                result.Message = "User creado exitosamente";
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = ex.Message;
            }
            return result;
        }

        public Task<ResultOperation<bool>> DeleteUserAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<ResultOperation<List<UserDTO>>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<ResultOperation<UserDTO>> GetByEmailAsync(string email)
        {
            throw new NotImplementedException();
        }

        public Task<ResultOperation<UserDTO>> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }
    }
}
