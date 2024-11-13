using Application.DTOs;
using Core.Utils;

namespace Application.Interfaces
{
    public interface IUserManager
    {
        Task<ResultOperation<UserDTO>> CreateAsync(UserCreateDTO newUser);
        Task<ResultOperation<UserDTO>> GetByIdAsync(int id);
        Task<ResultOperation<UserDTO>> GetByEmailAsync(string email);
        Task<ResultOperation<List<UserDTO>>> GetAllAsync();
        Task<ResultOperation<bool>> DeleteUserAsync(int id);
    }
}
