using API.Extensions;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddApplicationService(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration); 
var app = builder.Build(); 

app.UseHttpsRedirection();


builder.Services.AddCors();
// Configure the HTTP request pipeline
app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200 , https://localhost:4200"));

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers(); 

app.Run();
