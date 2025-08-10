using Carpool.DAL.Interfaces;

namespace Carpool.DAL.Repositories;

public class UnitOfWork(
    ApplicationDbContext _context,
    IRidePostRepository ridePostRepository,
    IRidePostCommentRepository ridePostCommentRepository,
    IReviewRepository reviewRepository,
    ILocalityRepository localityRepository,
    ICountryRepository countryRepository,
    ILocalityTypeRepository localityTypeRepository,
    IRegionRepository regionRepository,
    IDistrictRepository districtRepository,
    IRideRoleRepository rideRoleRepository,
    IGuestRepository guestRepository,
    ICommentRepository commentRepository,
    IAimakRepository aimakRepository) : IUnitOfWork
{
    public IRidePostRepository RidePosts { get; } = ridePostRepository;

    public IRidePostCommentRepository RidePostComments { get; } = ridePostCommentRepository;

    public IReviewRepository Reviews { get; } = reviewRepository;

    public ILocalityRepository Localities { get; } = localityRepository;

    public ICountryRepository Countries { get; } = countryRepository;

    public ILocalityTypeRepository LocalityTypes { get; } = localityTypeRepository;

    public IRegionRepository Regions { get; } = regionRepository;

    public IDistrictRepository Districts { get; } = districtRepository;

    public IAimakRepository Aimaks { get; } = aimakRepository;

    public IRideRoleRepository RideRoles { get; } = rideRoleRepository;

    public IGuestRepository Guests { get; } = guestRepository;

    public ICommentRepository Comments { get; } = commentRepository;

    public Task SaveChangesAsync()
    {
        return _context.SaveChangesAsync();
    }
}
