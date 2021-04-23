using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Activities;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

public class Details
{
    public class Query : IRequest<Result<ActivityDto>>
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<ActivityDto>>
    {
        private readonly DataContext _context;
        private readonly IMapper _iMapper;
        public Handler(DataContext context, IMapper iMapper)
        {
            _iMapper = iMapper;
            _context = context;
        }

        public async Task<Result<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities
            .ProjectTo<ActivityDto>(_iMapper.ConfigurationProvider)
            .FirstOrDefaultAsync(x => x.Id == request.Id);
            return Result<ActivityDto>.Success(activity);
        }
    }
}