var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild",
    "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weather", () =>
{
    var forecastDate = DateOnly.FromDateTime(DateTime.UtcNow);
    var temperatureC = Random.Shared.Next(-20, 40);

    return Results.Ok(new WeatherReport(
        forecastDate,
        temperatureC,
        (int)(temperatureC * 9 / 5 + 32),
        summaries[Random.Shared.Next(summaries.Length)]));
});

app.Run();

internal record WeatherReport(DateOnly Date, int TemperatureC, int TemperatureF, string Summary);
