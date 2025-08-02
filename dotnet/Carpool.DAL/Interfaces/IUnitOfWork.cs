namespace Carpool.DAL.Interfaces;

public interface IUnitOfWork
{
    IRidePostRepository RidePosts { get; }
    IRidePostCommentRepository RidePostComments { get; }
    IReviewRepository Reviews { get; }
    ILocalityRepository Localities { get; }
    ICountryRepository Countries { get; }
    ILocalityTypeRepository LocalityTypes { get; }
    IRegionRepository Regions { get; }
    IDistrictRepository Districts { get; }
    IAimakRepository Aimaks { get; }
    IRideRoleRepository RideRoles { get; }
    IGuestRepository Guests { get; }

    Task SaveChangesAsync();
}
