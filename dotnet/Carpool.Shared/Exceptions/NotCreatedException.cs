namespace GameStore.Shared.Exceptions;

public class NotCreatedException(Type type)
    : Exception($"{type.Name} was not created.")
{
}