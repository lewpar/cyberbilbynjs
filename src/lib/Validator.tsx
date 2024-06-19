export class ValidationResult {
    constructor(public result: boolean, public message?: string) {}
}

export enum InputValidationType {
    BlogPostTitle,
    BlogPostContent,
    BlogPostShortContent,
    BlogPostSlug,
    BlogPostCoverImage
}

export class Validator {
    static validate(type: InputValidationType, data: any): ValidationResult {
        switch(type)
        {
            case InputValidationType.BlogPostTitle: {
                let title = data as string;

                if(!title) {
                    return new ValidationResult(false, "No title was found.");
                }

                if(title.length < 1 || title.length > 128) {
                    return new ValidationResult(false, "Titles must be between 0 and 128 characters.");
                }

                return new ValidationResult(true);
            }

            case InputValidationType.BlogPostContent: {
                let content = data as string;

                if(!content) {
                    return new ValidationResult(false, "No content was found.");
                }

                if(content.length < 1 || content.length > 65536) {
                    return new ValidationResult(false, "Content must be between 0 and 65,536 characters.");
                }

                return new ValidationResult(true);
            }
            
            case InputValidationType.BlogPostShortContent: {
                let shortContent = data as string;

                if(!shortContent) {
                    return new ValidationResult(false, "No short content was found.");
                }

                if(shortContent.length < 1 || shortContent.length > 256) {
                    return new ValidationResult(false, "Short content must be between 0 and 256 characters.");
                }

                return new ValidationResult(true);
            }

            case InputValidationType.BlogPostSlug: {
                let slug = data as string;

                if(!slug) {
                    return new ValidationResult(false, "No slug was found.");
                }

                if(slug.length < 1 || slug.length > 128) {
                    return new ValidationResult(false, "Slugs must be between 0 and 128 characters.");
                }

                let slugPattern = new RegExp("^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$");
                if(!slugPattern.test(slug)) {
                    return new ValidationResult(false, "Slugs should only contain alphanumeric characters with dashes and no spaces.");
                }

                return new ValidationResult(true);
            }

            case InputValidationType.BlogPostCoverImage: {
                let coverImage = data as File;
                if(!coverImage) {
                    return new ValidationResult(false, "No cover image found.");
                }

                let megabyte = (1024 * 1024);
                if(coverImage.size < 1 || coverImage.size > (megabyte * 1)) {
                    return new ValidationResult(false, "Cover images should be lower than 1 MB.");
                }

                let acceptedExtensions = ["jpg", "jpeg", "png"];
                let fileName = coverImage.name.toLowerCase();
                let fileExtension = fileName.split('.').pop()!;
                if(!acceptedExtensions.includes(fileExtension))
                {
                    return new ValidationResult(false, `Cover image has invalid extension. Valid extensions: ${acceptedExtensions.join(", ")}`);
                }

                return new ValidationResult(true);
            }
        }

        return new ValidationResult(false, "No validation type was found while validating.");;
    }
}