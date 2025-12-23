import React, { useState } from "react";
import {
    Button,
    Table,
    Badge,
    Modal,
    Card,
    Pagination,
    Nav,
} from "react-bootstrap";

const defaultConfig = {
    service_name: "리뷰 댓글 관리",
    footer_text: "© 2025 리뷰 관리 시스템",
    sidebar_bg: "#2c3e50",
    sidebar_text: "#ecf0f1",
    sidebar_hover: "#34495e",
    primary_color: "#0d6efd",
    success_color: "#28a745",
    text_primary: "#212529",
    font_family: "Segoe UI",
};

const sampleReviews = [
    { id: 1, text: "음식이 정말 맛있었어요! 다음에도 또 올게요.", author: "김민수", status: "답변 대기", date: "2024-01-15" },
    { id: 2, text: "서비스가 친절하고 분위기도 좋았습니다.", author: "이지은", status: "답변 완료", date: "2024-01-14" },
    { id: 3, text: "가격 대비 양이 많아서 좋았어요.", author: "박준혁", status: "답변 대기", date: "2024-01-14" },
    { id: 4, text: "배달이 빨라서 따뜻하게 받았습니다!", author: "최유리", status: "답변 대기", date: "2024-01-13" },
    { id: 5, text: "재료가 신선하고 맛있었어요. 추천합니다!", author: "정현우", status: "답변 완료", date: "2024-01-13" },
    { id: 6, text: "포장도 깔끔하고 맛도 최고였습니다.", author: "강서연", status: "답변 대기", date: "2024-01-12" },
    { id: 7, text: "직원분들이 정말 친절하세요. 감사합니다!", author: "임도윤", status: "답변 완료", date: "2024-01-12" },
    { id: 8, text: "분위기가 아늑하고 데이트하기 좋았어요.", author: "한예진", status: "답변 대기", date: "2024-01-11" },
];

const suggestionsPool = [
    "소중한 리뷰 감사합니다! 앞으로도 더 나은 서비스로 보답하겠습니다. 🙏",
    "방문해 주셔서 감사합니다! 다음에 또 뵙기를 기대하겠습니다. 😊",
    "좋은 말씀 감사드립니다. 고객님의 만족이 저희의 가장 큰 기쁨입니다! ✨",
    "따뜻한 리뷰 감사합니다. 항상 최선을 다하는 저희가 되겠습니다! 💚",
    "응원해 주셔서 감사합니다! 더욱 발전하는 모습 보여드리겠습니다. 🌟",
    "귀한 시간 내어 리뷰 남겨주셔서 감사합니다. 다음 방문도 기다리겠습니다! 🎉",
];

const App = () => {
    const [config] = useState(defaultConfig);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);

    const itemsPerPage = 5;

    const generateSuggestions = () => {
        const shuffled = [...suggestionsPool].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 3);
    };

    // 리뷰 클릭 → 모달 오픈
    const handleReviewClick = (review) => {
        setSelectedReview(review);
        setSuggestions(generateSuggestions());
        setSelectedSuggestion(null);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedReview(null);
        setSelectedSuggestion(null);
    };

    // 추천 다시 생성
    const handleRegenerate = () => {
        setSuggestions(generateSuggestions());
        setSelectedSuggestion(null);
    };

    const handleSuggestionClick = (index) => {
        setSelectedSuggestion(index);
        setTimeout(() => setSelectedSuggestion(null), 1000);
    };

    const totalPages = Math.ceil(sampleReviews.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentReviews = sampleReviews.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const customFont = `${config.font_family || defaultConfig.font_family}, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;

    const sidebarNavStyle = {
        padding: "0.5rem 1rem",
        borderRadius: "8px",
        marginBottom: "8px",
        transition: "all 0.2s ease",
        color: config.sidebar_text || defaultConfig.sidebar_text,
        textDecoration: "none",
        display: "block",
        cursor: "pointer",
    };

    return (
        <div
            style={{
                fontFamily: customFont,
                height: "100vh",
                width: "100vw",
                display: "flex",
            }}
        >
            {/* 왼쪽 사이드바 */}
            <div
                style={{
                    width: "260px",
                    backgroundColor: config.sidebar_bg || defaultConfig.sidebar_bg,
                    color: config.sidebar_text || defaultConfig.sidebar_text,
                    display: "flex",
                    flexDirection: "column",
                    padding: "1.5rem 1rem",
                    boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
                }}
            >
                <div style={{ marginBottom: "2rem" }}>
                    <Button
                        style={{
                        width: "100%",
                        backgroundColor:
                            config.primary_color || defaultConfig.primary_color,
                        border: "none",
                        fontWeight: "bold",
                        }}
                    >
                        로그인
                    </Button>
                </div>

                <Nav className="flex-column">
                    <Nav.Link
                        href="#dashboard"
                        style={sidebarNavStyle}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = config.sidebar_hover || defaultConfig.sidebar_hover)
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "transparent")
                        }
                    >
                        <i className="bi bi-bar-chart-fill me-2" />
                        대시보드
                    </Nav.Link>
                    <Nav.Link
                        href="#reviews"
                        style={sidebarNavStyle}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = config.sidebar_hover || defaultConfig.sidebar_hover)
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "transparent")
                        }
                    >
                        <i className="bi bi-chat-dots-fill me-2" />
                        리뷰 관리
                    </Nav.Link>
                    <Nav.Link
                        href="#templates"
                        style={sidebarNavStyle}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = config.sidebar_hover || defaultConfig.sidebar_hover)
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "transparent")
                        }
                    >
                        <i className="bi bi-file-text-fill me-2" />
                        템플릿
                    </Nav.Link>
                    <Nav.Link
                        href="#settings"
                        style={sidebarNavStyle}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = config.sidebar_hover || defaultConfig.sidebar_hover)
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "transparent")
                        }
                    >
                        <i className="bi bi-gear-fill me-2" />
                        설정
                    </Nav.Link>
                </Nav>
            </div>

            {/* 오른쪽 메인 영역 */}
            <div
                style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
                }}
            >
                {/* 상단바 */}
                <div
                    style={{
                        backgroundColor: "#f8f9fa",
                        borderBottom: "1px solid #dee2e6",
                        padding: "1.5rem",
                    }}
                >
                    <h1
                        style={{
                        fontSize: "2rem",
                        fontWeight: "bold",
                        margin: 0,
                        color: config.text_primary || defaultConfig.text_primary,
                        }}
                    >
                        {config.service_name || defaultConfig.service_name}
                    </h1>
                </div>

                {/* 메인 컨텐츠 */}
                <div
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        padding: "2rem",
                        backgroundColor: "#fafafa",
                    }}
                >
                    <Card
                        style={{
                        boxShadow: "0 0.125rem 0.25rem rgba(0,0,0,0.075)",
                        borderRadius: 8,
                        }}
                    >
                        <Table hover responsive>
                            <thead style={{ backgroundColor: "#f8f9fa" }}>
                                <tr>
                                <th>댓글</th>
                                <th>작성자</th>
                                <th>상태구분</th>
                                <th>작성날짜</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentReviews.map((review) => (
                                <tr
                                    key={review.id}
                                    onClick={() => handleReviewClick(review)}
                                    style={{
                                    cursor: "pointer",
                                    transition: "background-color 0.2s",
                                    }}
                                    onMouseEnter={(e) =>
                                    (e.currentTarget.style.backgroundColor = "#f8f9fa")
                                    }
                                    onMouseLeave={(e) =>
                                    (e.currentTarget.style.backgroundColor = "transparent")
                                    }
                                >
                                    <td>{review.text}</td>
                                    <td>{review.author}</td>
                                    <td>
                                    <Badge
                                        bg={
                                        review.status === "답변 완료" ? "success" : "warning"
                                        }
                                        text={
                                        review.status === "답변 완료" ? "light" : "dark"
                                        }
                                    >
                                        {review.status}
                                    </Badge>
                                    </td>
                                    <td>{review.date}</td>
                                </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card>

                    {/* 페이지네이션 */}
                    <div
                        style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "2rem",
                        }}
                    >
                        <Pagination>
                            <Pagination.Prev
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                            >
                                이전
                            </Pagination.Prev>

                            {Array.from({ length: totalPages }).map((_, index) => {
                                const page = index + 1;
                                const active = currentPage === page;

                                return (
                                <Pagination.Item
                                    key={page}
                                    active={active}
                                    onClick={() => setCurrentPage(page)}
                                    style={
                                    active
                                        ? {
                                            backgroundColor:
                                            config.primary_color ||
                                            defaultConfig.primary_color,
                                            borderColor:
                                            config.primary_color ||
                                            defaultConfig.primary_color,
                                        }
                                        : {}
                                    }
                                >
                                    {page}
                                </Pagination.Item>
                                );
                            })}

                            <Pagination.Next
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(currentPage + 1)}
                            >
                                다음
                            </Pagination.Next>
                        </Pagination>
                    </div>
                </div>

                {/* 푸터 */}
                <div
                    style={{
                        backgroundColor: "#f8f9fa",
                        borderTop: "1px solid #dee2e6",
                        textAlign: "center",
                        padding: "1rem",
                    }}
                >
                    <p
                        style={{
                        margin: 0,
                        color: "#6c757d",
                        fontSize: "0.875rem",
                        }}
                    >
                        {config.footer_text || defaultConfig.footer_text}
                    </p>
                </div>
            </div>

            {/* 모달 */}
            <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div>
                            <h5
                                style={{
                                fontWeight: "bold",
                                marginBottom: "0.5rem",
                                }}
                            >
                                추천 답변
                            </h5>
                            <p
                                style={{
                                margin: 0,
                                color: "#6c757d",
                                fontSize: "0.875rem",
                                }}
                            >
                                "{selectedReview?.text}" - {selectedReview?.author}
                            </p>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div
                        style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        marginBottom: "1rem",
                        }}
                    >
                        {suggestions.map((suggestion, index) => (
                        <Card
                            key={index}
                            onClick={() => handleSuggestionClick(index)}
                            style={{
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            border:
                                selectedSuggestion === index
                                ? `2px solid ${
                                    config.success_color || defaultConfig.success_color
                                    }`
                                : "1px solid #dee2e6",
                            backgroundColor:
                                selectedSuggestion === index ? "#d4edda" : "white",
                            }}
                            onMouseEnter={(e) => {
                                if (selectedSuggestion !== index) {
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                    e.currentTarget.style.boxShadow =
                                    "0 0.25rem 0.75rem rgba(0,0,0,0.15)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                        >
                            <Card.Body>
                                <div
                                    style={{ display: "flex", alignItems: "start" }}
                                >
                                    <span
                                    style={{
                                        fontSize: "1.5rem",
                                        marginRight: "1rem",
                                    }}
                                    >
                                    {index + 1}️⃣
                                    </span>
                                    <p style={{ margin: 0 }}>{suggestion}</p>
                                </div>
                            </Card.Body>
                        </Card>
                        ))}
                    </div>
                    <Button
                        style={{
                        width: "100%",
                        backgroundColor:
                            config.primary_color || defaultConfig.primary_color,
                        border: "none",
                        fontWeight: "bold",
                        }}
                        onClick={handleRegenerate}
                    >
                        다시 생성하기
                    </Button>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default App;
