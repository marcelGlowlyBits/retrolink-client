export const SubscriptionForm = () => {
    return (
        <form action="/success" name="mailinglist" method="POST" data-netlify="true">
        <input type="hidden" name="form-name" value="mailinglist" />
    
        <p>
          <label htmlFor="youremail">
            Your Email:
          </label> <br />
          <input type="email" name="email" id="youremail" />
        </p>
        
        <p>
          <button type="submit">Send</button>
        </p>
      </form>
    )
}