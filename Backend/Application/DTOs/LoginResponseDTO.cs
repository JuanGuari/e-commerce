using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class LoginResponseDTO
    {
        public int Id {  get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public ICollection<OrderDTO>? Orders { get; set; }
        
        public string Token { get; set; }
    }
}
