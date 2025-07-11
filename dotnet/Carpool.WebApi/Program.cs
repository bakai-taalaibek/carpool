using Carpool.BLL.Intefaces;
using Carpool.BLL.Services;
using Carpool.DAL;
using Carpool.DAL.Interfaces;
using Carpool.DAL.Repositories;
using Carpool.WebApi.Helpers;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IReviewService, ReviewService>();
builder.Services.AddScoped<ILocalityService, LocalityService>();

builder.Services.AddScoped<IReviewRepository, ReviewRepository>();
builder.Services.AddScoped<IPostRepository, PostRepository>();
builder.Services.AddScoped<IPostCommentRepository, PostCommentRepository>();
builder.Services.AddScoped<ICountryRepository, CountryRepository>();
builder.Services.AddScoped<IRegionRepository, RegionRepository>();
builder.Services.AddScoped<IDistrictRepository, DistrictRepository>();
builder.Services.AddScoped<IAimakRepository, AimakRepository>();
builder.Services.AddScoped<ILocalityRepository, LocalityRepository>();
builder.Services.AddScoped<ILocalityTypeRepository, LocalityTypeRepository>();
builder.Services.AddScoped<ISeeder, Seeder>();

string? allowedOrigins = builder.Configuration["AllowedOrigins"];
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(cfg =>
    {
        if (!string.IsNullOrWhiteSpace(allowedOrigins))
        {
            cfg.WithOrigins(allowedOrigins.Split(','))
               .AllowAnyHeader()
               .AllowAnyMethod();
        }
    });
    options.AddPolicy("AnyOrigin", cfg =>
    {
        cfg.AllowAnyOrigin()
           .AllowAnyHeader()
           .AllowAnyMethod();
    });
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

var app = builder.Build();

if (args.Contains("--seed"))
{
    using var scope = app.Services.CreateScope();
    var seeder = scope.ServiceProvider.GetRequiredService<ISeeder>();

    var localities = CsvLoader.LoadLocalities("SeedData/localities.csv");
    await seeder.SeedLocalitiesAsync(localities);

    Console.WriteLine("✅ Database seeding completed.");
    return;
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseHttpsRedirection();
}

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
