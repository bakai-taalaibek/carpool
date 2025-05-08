namespace GameStore.Shared.Exceptions;

public class IncompleteRequestException(string message)
    : Exception(message)
{
}