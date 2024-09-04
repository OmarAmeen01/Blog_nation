
export default function formatDate(dateString:string) {
    const date:any = new Date(dateString);
    
    // Formatting the date (e.g., "08 Jan")
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    
    const formattedDate = `${day} ${month}`;
    const now:any = new Date();
    const diffInMs = now - date;
    
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInMonths / 12);
    
    let timeAgo:any;
    if (diffInYears > 0) {
      timeAgo = `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
    } else if (diffInMonths > 0) {
      timeAgo = `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    } else if (diffInDays > 0) {
      timeAgo = `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else {
      timeAgo = 'Today';
    }
    
    return { formattedDate, timeAgo };
  }