import { validateRoute } from '../../lib/auth';

// checking for validation 
export default validateRoute((req, res, user) => {
  res.json(user)
})