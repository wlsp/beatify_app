import { validateRoute } from '../../lib/auth';
import prisma from '../../lib/prisma';

// checking for validation 
export default validateRoute(async (req, res, user) => {
  const playlistsCount = await prisma.playlist.count({
    where:{
      userId: user.id
    }
  })
  res.json({...user, playlistsCount})
})