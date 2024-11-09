using Application.Interfaces;
using Application.Mapping;
using Application.Services;
using Domain.Repositories;
using Infrastructure.Data;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//ADD MANAGERS
builder.Services.AddTransient<IUserManager, UserManager>();

//ADD REPOSITORIES
builder.Services.AddScoped(typeof(IRepositoryAsync<>), typeof(RepositoryAsync<>));//genérico en tiempo de compilación
builder.Services.AddScoped<IUserRepository, UserRepository>();

//ADD DBCONTEXT
var connectionString = builder.Configuration.GetConnectionString("conexionDB");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

//ADD CORS POLICY
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder =>
        {
            builder.WithOrigins("http://localhost:4200") 
                   .AllowAnyHeader()
                   .AllowAnyMethod()
                   .AllowCredentials();
        });
});

//AGREGO PERFIL AUTOMAPPER 
builder.Services.AddAutoMapper(x => x.AddProfile(new AutoMapping()));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowSpecificOrigin");

app.UseAuthorization();

app.MapControllers();

app.Run();
