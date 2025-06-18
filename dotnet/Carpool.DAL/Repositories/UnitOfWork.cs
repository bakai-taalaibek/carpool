using Carpool.DAL.Interfaces;

namespace Carpool.DAL.Repositories;

public class UnitOfWork(
    ApplicationDbContext _context, 
    IPostRepository postRepository, 
    IPostCommentRepository postCommentRepository, 
    IReviewRepository reviewRepository, 
    ILocalityRepository localityRepository,
    ICountryRepository countryRepository,
    ILocalityTypeRepository localityTypeRepository,
    IRegionRepository regionRepository,
    IDistrictRepository districtRepository,
    IAimakRepository aimakRepository) : IUnitOfWork
{
    public IPostRepository Posts { get; } = postRepository;

    public IPostCommentRepository PostComments { get; } = postCommentRepository;

    public IReviewRepository Reviews { get; } = reviewRepository;

    public ILocalityRepository Localities { get; } = localityRepository;

    public ICountryRepository Countries { get; } = countryRepository;

    public ILocalityTypeRepository LocalityTypes { get; } = localityTypeRepository;

    public IRegionRepository Regions { get; } = regionRepository;

    public IDistrictRepository Districts { get; } = districtRepository;

    public IAimakRepository Aimaks { get; } = aimakRepository;

    public Task SaveChangesAsync()
    {
        return _context.SaveChangesAsync();
    }
}
