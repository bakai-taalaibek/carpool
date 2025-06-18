namespace Carpool.DAL.Interfaces;

public interface IUnitOfWork
{
    IPostRepository Posts { get; }
    IPostCommentRepository PostComments { get; }
    IReviewRepository Reviews { get; }
    ILocalityRepository Localities { get; }
    ICountryRepository Countries { get; }
    ILocalityTypeRepository LocalityTypes { get; }
    IRegionRepository Regions { get; }
    IDistrictRepository Districts { get; }
    IAimakRepository Aimaks { get; }

    Task SaveChangesAsync();
}
