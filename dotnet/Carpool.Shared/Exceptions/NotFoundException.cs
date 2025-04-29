namespace GameStore.Shared.Exceptions;

public class NotFoundException(string message)
    : Exception(message)
{
}