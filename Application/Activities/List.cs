using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;
using AutoMapper.QueryableExtensions;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<List<ActivityDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly ILogger<List> _logger;
            private readonly IMapper _iMapper;

            public Handler(DataContext context, ILogger<List> logger, IMapper iMapper)
            {
                _iMapper = iMapper;
                _logger = logger;
                _context = context;
            }

            public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                _logger.LogWarning("List of Activities requested");

                var activities = await _context.Activities
                .ProjectTo<ActivityDto>(_iMapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

                return Result<List<ActivityDto>>.Success(activities);
            }
        }
    }
}