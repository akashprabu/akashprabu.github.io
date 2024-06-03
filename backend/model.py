class Experience:
    """ Model for Experience """

    def __init__(
        self, _id, role, company, job_type, location, logo, start_date, end_date, desc, tech
    ) -> None:
        self._id = _id
        self.role = role
        self.company = company
        self.job_type = job_type
        self.location = location
        self.logo = logo
        self.start_date = start_date
        self.end_date = end_date
        self.desc = desc
        self.tech = tech


class Bio:
    """ Model for Bio """

    def __init__(self, _id, bio) -> None:
        self._id = _id
        self.bio = bio


class Projects:
    """ Model for Projects """

    def __init__(self, _id, title, desc, link) -> None:
        self._id = _id
        self.title = title
        self.desc = desc
        self.link = link


class Photo:
    """ Model for Photo """

    def __init__(self, _id, photo_name, photo_url) -> None:
        self._id = _id
        self.photo_name = photo_name
        self.photo_url = photo_url


class Links:
    """ Model for Links """

    def __init__(self, _id, name, link) -> None:
        self._id = _id
        self.name = name
        self.link = link

class Skills:
    """Model for Skills"""
    def __init__(self, id, name) -> None:
        self.id = id
        self.name = name
        
class Association:
    """Model for Association """
    def __init__(self, id, name, url) -> None:
        self.id = id
        self.name = name
        self.url = url