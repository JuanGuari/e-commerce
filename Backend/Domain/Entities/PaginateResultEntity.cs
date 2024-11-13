using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class PaginateResultEntity
    {
       public int TotalItems {  get; set; }
       public int PageNumber {  get; set; }
       public int PageSize { get; set; }
       public ICollection<ProductEntity>? Products { get; set; }
    }
}
