using AutoMapper;
using Domain.Entities;
using Application.DTOs;

namespace Application.Mapping
{
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {
            CreateMap<UserEntity, UserDTO>().ReverseMap(); 
            CreateMap<UserCreateDTO, UserEntity>()
                .ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(src => HashPassword(src.Password)));
            CreateMap<OrderDTO, OrderEntity>().ReverseMap();
            CreateMap<OrderProductDTO, OrderProductEntity>().ReverseMap();
        }
        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }
    }
}
