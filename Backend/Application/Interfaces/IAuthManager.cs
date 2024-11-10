using Application.DTOs;
using Core.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IAuthManager
    {
        Task<ResultOperation<string>> VerifyUser(LoginDTO loginDto);
    }
}
